const catchAsyncError = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next)).catch(next);
};


//same as above function
// const catchAsyncError = (passedFunction) => {
//   return (req, res, next) => {
//     Promise.resolve(passedFunction(req, res, next)).catch(next);
//   };
// };

export default catchAsyncError;