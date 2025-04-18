import { DeliveryIcon, FoodIcon, PizzaIcon } from "@/Icons/indexIcon";

function AboutUsDivision() {
  return (
    <div className="w-full mt-32 mb-14 text-[#642f21] flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
      {[
        {
          id: 1,
          icon: PizzaIcon,
          title: "Original Recipies",
          description:
            "Discover a collection of unique, handcrafted dishes blending creativity and tradition. Perfect for food lovers seeking fresh, exciting flavors and culinary inspiration.",
        },
        {
          id: 2,
          icon: FoodIcon,
          title: "Quality Foods",
          description:
            "Experience the finest ingredients and exceptional flavors. From farm-fresh produce to gourmet creations, enjoy meals crafted with care and excellence.",
        },
        {
          id: 3,
          icon: DeliveryIcon,
          title: "Fastest Delivery",
          description:
            "Get your orders delivered swiftly and reliably. Enjoy fresh, high-quality products at your doorstep in no time.",
        },
      ].map(({ id, icon: Icon, title, description }) => (
        <div key={id} className="flex items-center flex-col gap-5">
          <Icon size="5rem" />
          <h2 className="uppercase font-semibold text-xl">{title}</h2>
          <p className="text-center w-[69%]">{description}</p>
        </div>
      ))}
    </div>
  );
}

export default AboutUsDivision;
