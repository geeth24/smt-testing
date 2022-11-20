
import Select from "./Select";
import { motion } from "framer-motion";

interface HeaderProps {
  selected: any;
  setSelected: any;
  getResults: any;
}
export default function Hero({
  selected,
  setSelected,
  getResults,
}: HeaderProps) {
  return (
    <div className="relative overflow-hidden">
      <main>
        <div className="bg-slate-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <motion.span
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", duration: 1 }}
                      viewport={{ once: true }}
                      className="block"
                    >
                      Smart Math Tutoring
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", duration: 1 }}
                      viewport={{ once: true }}
                      className="block text-red-400"
                    >
                      Testing Scheduling
                    </motion.span>
                  </h1>
                  <p className="mt-3 text-base text-slate-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Please select your grade level in order to view the
                    available testing dates and times.
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                      <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                          <Select
                            selected={selected}
                            setSelected={setSelected}
                          />
                        </div>
                        <div className="mt-5 sm:ml-3">
                          <button
                            type="submit"
                            className="block w-full rounded-md bg-red-500 py-2 px-4 font-medium text-white shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                            onClick={getResults}
                          >
                            Show Available Times
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  <motion.img
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      default: {
                        duration: 6,
                        ease: "easeInOut",
                        repeat: Infinity,
                      },
                    }}
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="/geo.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More main page content here... */}
      </main>
    </div>
  );
}
