import Listbox from "../Manager/Listbox";

export default function Manager() {
  function confirmTeam() {
    // confirm Team Selection via Smart Contract
  }
  return (
    <form className="flex flex-col items-center  w-full ">
      <div className="flex flex-col items-center justify-center p-12 w-full bg-[url('/wildc-soccer-field.png')]">
        <div className="py-4 w-2/12 z-50">
          <Listbox position={0} />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-11/12 z-40">
          <div className="py-2 w-2/12">
            <Listbox />
          </div>
          <div className="py-2 w-2/12">
            <Listbox />
          </div>
          <div className="py-2 w-2/12">
            <Listbox />
          </div>
        </div>
        <div className="py-2 w-2/12 z-30">
          <Listbox />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-full z-20">
          <div className="py-2 w-2/12">
            <Listbox />
          </div>
          <div className="py-2 w-2/12">
            <Listbox />
          </div>
          <div className="py-2 w-2/12">
            <Listbox />
          </div>
        </div>
        <div className="py-2 w-2/12 z-10">
          <Listbox />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-8/12">
          <div className="py-2 w-3/12">
            <Listbox />
          </div>
          <div className="py-2 w-3/12">
            <Listbox />
          </div>
        </div>
      </div>
      <button
        onClick={confirmTeam}
        className=" w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Confirm Team
      </button>
    </form>
  );
}
