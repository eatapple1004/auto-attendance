const RecordVO = require('../models/RecordVO');
const exportParsedRepo  = require('../repositories/exportParsedRepo');

exports.exportParsed = async (recordVOList) => {
    exportParsedRepo.exportParsed(recordVOList);
};