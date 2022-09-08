//fs : async

// const { readFile, writeFile } = require("fs");
// const util = require("util");
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);4

//if we use like this, we dont need to use readFilePromise etc,instead we can just use readFile directly
const { readFile, writeFile } = require("fs").promises;

//using async await
const start = async () => {
  try {
    const first = await readFile("../content/first.txt", "utf-8");
    const second = await readFile("../content/second.txt", "utf-8");
    await writeFile(
      "../content/await-result.txt",
      `This is just AWESOME. It is a txt file`
    );
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};
start();

/*--> func returning a promise
const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

--> consuming a promise by .then and .catch
getText("../content/first.txt")
  .then((result) => console.log(result))
  .catch((err) => console.log(err));


--> another way is using async await
const start = async () => {
  try {
    const first = await getText("../content/first.txt");
    const second = await getText("../content/second.txt");
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};
start();
*/
