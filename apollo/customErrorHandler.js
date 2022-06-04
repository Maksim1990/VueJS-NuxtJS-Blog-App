export default (error, {redirect}) => {
  if (error.networkError){
    if(error.networkError.toString().includes("401")){
      error({ statusCode: 401, message: error.message });
    }
  }
}
