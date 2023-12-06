import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  md: {
    breakpoint: { max: 1000, min: 500 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

type Props = {
  children: React.ReactNode;
};

export default function MultiCarousel({ children }: Props) {
  return (
    <Carousel
      containerClass="w-full flex p-[1rem] gap-2"
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
}
