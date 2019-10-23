

function goodreadsService() {
  function getBookById(bookId) {
    return new Promise((resolve, reject) => {
      resolve({
        description: 'our description'
      });
    });
  }

  return {
    getBookById
  };
}

module.exports = goodreadsService;
