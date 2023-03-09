const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

async function connecDB(url) {
  try {
        const data = await mongoose
            .connect(url);
        return data;
    } catch (error) {
        return console.log(error);
    }
}

module.exports = connecDB