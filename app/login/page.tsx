export default function LoginPage(){
    return(
        <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl text-black font-bold mb-4">Welcome</h2>
            <p className="text-gray-700">Authentication placeholder</p>
            {/*login form placeholder here*/}
            <div className="mt-4">
                <input aria-label="Email" className="border w-full placeholder-gray-400 text-black px-3 py-2 rounded mb-3" placeholder="Email" />
                <input aria-label="Email" className="border w-full placeholder-gray-400 text-black px-3 py-2 rounded mb-3" placeholder="Password" />
                <button className="bg-blue-600 text-white w-full py-2 rounded">
                    Login
                </button>
            </div>
        </div>
    )
}