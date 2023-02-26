const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
const port = 3000;

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/signup.html`);
});

mailchimp.setConfig({
	apiKey: "788389ac609f0f7cbd04ac0ab261fdad-us21",
	server: "us21",
});

app.post("/", (req, res) => {
	let firstName = req.body.fname;
	let lastName = req.body.lname;
	let email = req.body.email;

	const listId = "75a84ad94f";
	const subscribingUser = {
		firstName: firstName,
		lastName: lastName,
		email: email,
	};
	const run = async () => {
		try {
			const response = await mailchimp.lists.addListMember(listId, {
				email_address: subscribingUser.email,
				status: "subscribed",
				merge_fields: {
					FNAME: subscribingUser.firstName,
					LNAME: subscribingUser.lastName,
				},
			});
			console.log(response);
			res.sendFile(__dirname + "/success.html");
			console.log(
				`Successfully added contact as an audience member. The contact's id is ${response.id}.`
			);
		} catch (err) {
			console.log(err.status);
			res.sendFile(__dirname + "/failure.html");
		}
	};
	run();
});

app.post("/failure", function (req, res) {
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`listening at port ${port}`);
});

// API KEY : 788389ac609f0f7cbd04ac0ab261fdad-us21
//List ID : 75a84ad94f
