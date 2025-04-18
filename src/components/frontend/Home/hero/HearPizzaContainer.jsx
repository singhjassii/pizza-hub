import {
  DeliveryIcon,
  FoodIcon,
  IcecreamIcon,
  PizzaIcon,
} from "@/Icons/indexIcon";
import Image from "next/image";

function HearPizzaContainer() {
  return (
    <div className="bg-[#f7be27]">
      <div className="mainContainer py-24 flex flex-col md:flex-row justify-between">
        <Image
          src="/about-02-img.png"
          alt="heart-pizza"
          height={800}
          width={800}
          className="md:w-[45%]  md:h-full"
        />
        <div className="md:w-[50%] text-[#642f21] flex flex-col gap-5">
          <h2 className="uppercase text-4xl md:text-[4rem] md:leading-[5rem]  font-medium">
            Nothing brings people together like a good pizza
          </h2>
          <p className="text-2xl font-light">
            Experience the finest ingredients and exceptional flavors. From
            farm-fresh produce to gourmet creations, enjoy meals crafted with
            care and excellence.
          </p>
          <div className="flex flex-wrap gap-10 items-center">
            {[
              { icon: PizzaIcon },
              { icon: FoodIcon },
              { icon: IcecreamIcon },
              { icon: DeliveryIcon },
            ].map(({ icon: Icon }, index) => (
              <Icon size="5rem" key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HearPizzaContainer;
