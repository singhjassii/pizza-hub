import DeliveryIcon from "@/icons/DeliveryIcon";
import FoodIcon from "@/icons/FoodIcon";
import PizzaIcon from "@/icons/PizzaIcon";

function AboutUsDivision() {
  return (
    <div className="w-full mt-32 mb-14 text-[#642f21] flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
      {[
        {
          icon: PizzaIcon,
          title: "Original Recipies",
          description:
            "Discover a collection of unique, handcrafted dishes blending creativity and tradition. Perfect for food lovers seeking fresh, exciting flavors and culinary inspiration.",
        },
        {
          icon: FoodIcon,
          title: "Quality Foods",
          description:
            "Experience the finest ingredients and exceptional flavors. From farm-fresh produce to gourmet creations, enjoy meals crafted with care and excellence.",
        },
        {
          icon: DeliveryIcon,
          title: "Fastest Delivery",
          description:
            "Get your orders delivered swiftly and reliably. Enjoy fresh, high-quality products at your doorstep in no time.",
        },
      ].map(({ icon: Icon, title, description }, index) => (
        <div key={index} className="flex items-center flex-col gap-5">
          <Icon size="5rem" />
          <h2 className="uppercase font-semibold text-xl">{title}</h2>
          <p className="text-center w-[69%]">{description}</p>
        </div>
      ))}
    </div>
  );
}

export default AboutUsDivision;
