const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Slot Mailing');
require('./config/db')();
