module.exports = (data) => {
  return {
    from: "ai-course-datascience@iitrpr.ac.in", // Sender address
    to: data.email, // List of recipients
    subject: data.subject, // Subject line
    text: data.text, // Plain text body
    html: data.html,
  };
};
