const mailer = require("../Nodemailer/mailer");
const configureMessage = require("../Nodemailer/configureMessage");

// let mailTo = [];
// for (let i = 0; i < 1000; i++) {
//   mailTo.push(`test${i + 1}@gmail.com`);
// }

const sendMail = async (mailTo) => {
  let date = Date.now();
  for (let i = 0; i < 1000; i++) {
    console.log("sending mail to = ", mailTo[i]);
    console.log(
      configureMessage({
        email: mailTo[i],
        subject: "DSAT timeslot",
        text: "Your timeslot for the dsat is at this time",
      })
    );
    await mailer(
      configureMessage({
        email: mailTo[i],
        subject: "DSAT timeslot",
        text: "Your timeslot for the dsat is at this time",
      })
    );
    console.log(`Mail ${i} sent, took ${(Date.now() - date) / (1000 * 60)}s`);
  }
};

//sendMail();

let test = `timlinux@verizon.net
pizza@gmail.com
weidai@msn.com
esbeck@icloud.com
dmiller@mac.com
hahiss@mac.com
mdielmann@att.net
mbrown@gmail.com
hermanab@aol.com
jtorkbob@optonline.net
lishoy@gmail.com
crobles@mac.com
overbom@sbcglobal.net
jbuchana@aol.com
eurohack@yahoo.com
michiel@optonline.net
gamma@verizon.net
sokol@hotmail.com
tsuruta@hotmail.com
ghost@verizon.net
schwaang@sbcglobal.net
spadkins@me.com
violinhi@comcast.net
fatelk@outlook.com
zyghom@mac.com
glenz@outlook.com
euice@live.com
grady@mac.com
jaarnial@me.com
policies@sbcglobal.net
moxfulder@gmail.com
eegsa@msn.com
jwarren@optonline.net
madanm@mac.com
lbaxter@hotmail.com
matsn@icloud.com
cremonini@me.com
cgcra@icloud.com
koudas@mac.com
thomasj@yahoo.com
lamky@comcast.net
jfinke@outlook.com
kourai@gmail.com
keiji@msn.com
zwood@att.net
engelen@icloud.com
sartak@msn.com
snunez@me.com
hampton@me.com
bwcarty@mac.com
ahuillet@sbcglobal.net
arandal@verizon.net
scitext@yahoo.ca
wikinerd@live.com
frostman@optonline.net
amimojo@outlook.com
jonas@optonline.net
osaru@verizon.net
munjal@verizon.net
dhwon@live.com
portscan@yahoo.ca
phyruxus@gmail.com
hellfire@mac.com
webdragon@aol.com
duchamp@icloud.com
padme@hotmail.com
chunzi@att.net
kawasaki@icloud.com
payned@icloud.com
mobileip@mac.com
kramulous@me.com
roamer@me.com
twoflower@msn.com
psichel@att.net
jbailie@aol.com
tromey@hotmail.com
kayvonf@sbcglobal.net
peoplesr@live.com
kohlis@msn.com
isotopian@gmail.com
dkrishna@msn.com
ryanvm@yahoo.ca
durist@msn.com
gslondon@hotmail.com
cgarcia@att.net
jsnover@outlook.com
budinger@aol.com
shazow@gmail.com
miyop@mac.com
ryanshaw@mac.com
pgolle@me.com
wainwrig@comcast.net
trygstad@sbcglobal.net
mrdvt@yahoo.com
ilial@optonline.net
jginspace@sbcglobal.net
podmaster@att.net
bryam@yahoo.com
kingjoshi@outlook.com
budinger@hotmail.com`;

sendMail(test.split("\n"));
