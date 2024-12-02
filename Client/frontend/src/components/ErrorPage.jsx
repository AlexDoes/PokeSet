const ErrorPage = () => {
  return (
    <div className="w-full flex justify-center flex-col border-2 items-center p-4">
      <h1>Error: 404</h1>
      <img src="/icon.png" className="w-fit h-fit"></img>
      <h2 className="text-muted brightness-200">
        {" "}
        Psyduck couldn't find this page
      </h2>
    </div>
  );
};

export default ErrorPage;
