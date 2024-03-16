import Form from "../components/Form";
import Footer from "../components/Footer";

const Games = () => {
  return (
    <>
      <div className=" bg-lime-700 bg-gradient-to-t from-lime-800 pb-40">
        <div className="bg-lime-500 bg-gradient-to-t from-lime-700 text-zinc-900 font-serif text-center items-center justify-center m-auto p-4 rounded-md max-w-sm sm:max-w-md">
          <div className="text-4xl">
            <span className="font-semibold">Circo</span>
            Sophia
          </div>
          <p className="mt-2 tracking-wide sm:tracking-widest">
            Biblioteka cyrkowych gier i zabaw
          </p>
        </div>
        <Form />
      </div>
      <Footer />
    </>
  );
};

export default Games;
