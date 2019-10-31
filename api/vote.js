const auth = require("../src/auth");
const authors = require("../src/authors");
const server = require("../server");
const users = require("../src/users");

module.exports = function (data) {
  try {
    if (!auth.sessionValid(data.authUserID, data.authSession)) return data.res.sendStatus(401);
    if (!data.req.query.id) return data.res.sendStatus(400);

    var modautors = authors.getAuthors().map(a => a.id);
    if (!modautors.includes(data.req.query.id)) return data.res.sendStatus(404);

    var user = users.getUser(data.user.user.id);
    if (user.votes.includes(data.req.query.id)) return data.res.sendStatus(409);
    if (user.votes.length == 3) return data.res.sendStatus(406);

    var discordids = authors.getAuthor(data.req.query.id).discordids.split(",");
    if (discordids.includes(data.authUserID)) return data.res.sendStatus(418) && server.bot.fetchUser("183249892712513536").then(user => user.send(`\`${data.user.user.tag}\` tried to vote for themselves and got rolled! <a:rolled:639351719242891264>`));

    user.votes.push(data.req.query.id);
    users.setUserObject(user);
    data.res.sendStatus(200);
  } catch (e) {
    console.error(e);
    data.res.sendStatus(500);
  }
}