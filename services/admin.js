const Batch = require('../models/Batch');
const Admin = require('../models/Admin');
const Outline = require('../models/CourseOutline');
const EventModel = require('../models/Event');
const jwt = require('jsonwebtoken');
const config = require('config');

class AdminAuthService {
  async signIn(username, password) {
    try {
      let user = await Admin.findOne({ username });
      if (!user) {
        throw new Error('No Such User Present');
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          // res
          //   .status(400)
          //   .json(failErrorResponse('Credentials Provided are not correct'));
          throw new Error('Credentials Provided are not correct');
        }
      });

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get('JSONTokenSecretAdminUser'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          return {
            status: 'success',
            data: {
              token,
            },
          };
        }
      );
    } catch (err) {
      console.log('Error : ', err);
      throw err;
    }
  }
}

module.exports = { AdminAuthService };
