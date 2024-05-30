import styles from "./Gallery.module.scss";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { FullModal } from "@/components/Shared";
import { useState } from "react";
import Slider from "react-slick";
import {
  arrows,
  infinite,
  slidesToScroll,
} from "react-slick-carousel/lib/default-props";

export function Gallery(props) {
  const { screenshots } = props;

  const [show, setShow] = useState(false);

  const screenshotsClone = [...screenshots];
  const principalImage = screenshotsClone.shift();

  const onOpenClose = () => {
    setShow((prevState) => !prevState);
  };

  const settings = {
    dots: true,
    dotsClass: styles.dots,
    infinite: true,
    slidersToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: function (index) {
      return <Image src={screenshots[index].attributes.url}></Image>;
    },
  };

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.principal}>
          <Image
            src={principalImage.attributes.url}
            onClick={onOpenClose}
          ></Image>
        </div>
        <div className={styles.grid}>
          {map(screenshotsClone, (screenshot) => (
            <div>
              <Image
                src={screenshot.attributes.url}
                onClick={onOpenClose}
              ></Image>
            </div>
          ))}
        </div>
      </div>

      <FullModal show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            {map(screenshots, (screenshot) => (
              <div key={screenshot.id}>
                <Image src={screenshot.attributes.url}></Image>
              </div>
            ))}
          </Slider>
        </div>
      </FullModal>
    </>
  );
}
