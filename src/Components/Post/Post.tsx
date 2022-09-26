import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { XMarkIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import "./Post.css";

type Props = {
  posts: DiaryPostType[];
};

const Day = ({ posts }: Props) => {
  const [showCarousel, setShowCarousel] = useState(false);
  useEffect(() => {
    if (showCarousel) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";

    return () => {};
  }, [showCarousel]);

  const getStar = (n: number) => {
    let res = [];
    for (let i = 0; i < n; i++) {
      res.push(<StarIcon key={i} className='h-5 w-5' />);
    }
    return res;
  };

  return (
    <>
      <div
        onClick={() => setShowCarousel(true)}
        className='overflow-hidden rounded-md flex align-middle'
        style={{ aspectRatio: 3 / 4 }}>
        <img
          src={posts[0].media[0].mediaurl}
          alt=''
          width='100%'
          height='100%'
        />
      </div>
      {showCarousel ? (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-20 bg-[rgba(0,0,0,0.7)] '>
          <div
            onClick={() => setShowCarousel(false)}
            className='absolute right-[20px] top-[20px] p-2 bg-slate-500 rounded-full cursor-pointer z-30'>
            <XMarkIcon className='w-[32px] h-[32px]' />
          </div>
          <div className='mx-auto max-w-md h-full flex items-center'>
            <Carousel
              selectedItem={0}
              className=' w-full h-fit '
              emulateTouch
              infiniteLoop
              centerMode
              showThumbs={false}
              showIndicators={false}
              useKeyboardArrows
              showStatus={false}
              // showStatus={false}
              centerSlidePercentage={76}>
              {posts.map((post: DiaryPostType) => (
                <div
                  key={post.id}
                  className='border rounded-lg border-black -mx-2 overflow-hidden bg-white'>
                  <div
                    className='w-full overflow-hidden flex align-middle'
                    style={{ aspectRatio: 3 / 4 }}>
                    <img
                      src={post.media[0].mediaurl}
                      alt=''
                      width='100%'
                      height='100%'
                    />
                  </div>
                  <div className='w-full flex justify-end p-2'>
                    {getStar(post.rating)}
                  </div>
                  <div className='text-start px-2 pt-2 mb-4 line-clamp-3 h-[80px]'>
                    {post.text}
                  </div>
                  <hr />
                  <div className='py-2 text-xl font-semibold'>
                    View Full Post
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Day;
