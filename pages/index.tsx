import Form from "../components/Form";
import Footer from "../components/Footer";

const Games = () => {
  return (
    <>
      <div className=" bg-lime-700 bg-gradient-to-t from-lime-900 pb-40">
        <div className="text-zinc-900 p-6 font-serif text-center">
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
