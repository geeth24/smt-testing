import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserAuth } from "../../../components/Auth/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // @ts-ignore
  const { signIn, isLoading, user } = UserAuth();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(email, password);
      await signIn(email, password);
      router.push("/admin");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="flex flex-col flex-1 w-full max-w-md mx-auto my-0 py-12 px-4 sm:px-6 lg:px-8 bg-slate-800 rounded-lg">
          <div className="mx-auto w-full max-w-sm lg:w-96 ">
            <div>
              <img
                className="h-12 w-auto"
                src="/smtlogo.png"
                alt="Smart Math Tutoring"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-red-300">
                Sign in to your admin account
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-slate-300"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
