import Image from "next/image";

function Hero() {
  return (
    <div className="w-full">
      <section className="hero relative w-full">
        <div className="hero-pizza h-full flex items-end pt-20 justify-center">
          <div className="z-30 -mb-14  w-[80%]">
            <h2 className="text-[5rem] md:text-[10rem] lg:text-[15rem] heroHeading text-center text-white uppercase font-[1000] tracking-wider opacity-30 -mb-[2.5rem] md:-mb-[6rem] lg:-mb-[8rem] -z-10 relative">
              pizza
            </h2>
            <Image
              src="/hero-5-img.png"
              height={1000}
              width={1000}
              alt="hero-pizza"
              className="m-auto"
            />
          </div>
        </div>
        <div className="curvedBorder w-full h-[155px] left-0 absolute bottom-0"></div>
      </section>
    </div>
  );
}

export default Hero;
