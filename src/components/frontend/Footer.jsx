import Image from "next/image";

function Footer() {
  return (
    <footer className="w-full py-10 flex flex-col items-center text-center justify-center gap-5">
      <Image src="/logo.png" height={200} width={200} alt="footer-log" />
      <p>
        &copy; 2025. Pizza Hub. All Rights Reserved. Made With ❤️ By Jaspreet
        Singh.
      </p>
    </footer>
  );
}

export default Footer;
