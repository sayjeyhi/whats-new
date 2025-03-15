export default function Newsletter() {
  return (
    <section className="text-left mt-2 border-t-2 border-gray-100 dark:border-gray-800 pt-12">
      <div className="flex items-center justify-between">
        <h2 className="font-inter-tight text-base font-semibold text-gray-700 dark:text-gray-100">
          Subscribe to changes!
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-400 mb-2">
          We won't spam you with updates, we promise!
        </p>
      </div>
      <div className="p-5 rounded-xl bg-linear-to-tr from-gray-100 to-gray-50 dark:bg-linear-to-tr dark:from-gray-800 dark:to-gray-800/[0.65]">
        <form>
          <div className="flex bg-white dark:bg-gray-900 p-2 rounded-lg focus-within:ring-2 ring-gray-300 dark:ring-gray-600">
            <input
              className="flex-1 text-sm bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 border-none focus:ring-0 focus:outline-hidden"
              type="email"
              name="email"
              aria-label="Enter your email to subscribe my newsletter"
              placeholder="Enter your email..."
              autoComplete="off"
            />
            <button className="btn-sm rounded-3xl font-semibold text-sm px-3 text-gray-200 dark:text-gray-800 bg-linear-to-r from-gray-800 to-gray-700 dark:from-gray-300 dark:to-gray-100 dark:hover:bg-gray-100 shadow-xs relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:opacity-20 dark:before:opacity-100 dark:before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-1500">
              Join Newsletter
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
