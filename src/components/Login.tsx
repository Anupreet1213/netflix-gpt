import Header from "./Header";

const Login = () => {
  return (
    // <div className="bg-login-bg">
    <div className="bg-login-bg h-[100vh] bg-cover">
      <Header />
      <div className="flex justify-center mt-[6%]">
        <form
          action=""
          className="flex flex-col bg-black px-16 py-16 lg:w-[28%] gap-6 opacity-90 rounded-md"
        >
          <h1 className="text-white text-3xl">Sign In</h1>
          <input
            type="text"
            placeholder="Enter Email"
            className="p-3 rounded bg-[#333333] text-teal-700 placeholder-[#8c8c8c]"
          />
          <input
            type="password"
            placeholder="Enter Paasword"
            className="p-3 rounded bg-[#333333] placeholder-[#8c8c8c]"
          />
          <button className="bg-red-600 text-white p-3 rounded" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
