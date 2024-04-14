import { FC } from 'react';

interface GiftsProps {}

const Gifts: FC<GiftsProps> = () => (
  <div className="Gifts">
    More coming soon! Stay tuned 🤖
    <br /><br />

    All images and resources used on this website belong to ConcernedApe and Official Stardew Valley Wiki. I do not own any of the content displayed here, and all credits for the images and resources go to their respective owners. A sincere "Thank you" to ConcernedApe and the contributors of the Official Stardew Valley Wiki."
    <p>Inquiries and suggestions about the website on <a href="mailto:work@castrom13.dev" target='_blank'>work@castrom13.dev</a></p>
    Want to contribute?
    <a href='https://ko-fi.com/H2H8WWQOO' target='_blank'>
      <button style={{display: 'flex', alignItems: 'center'}}>
        <img height="16px" style={{marginRight: '.5rem'}} src="https://storage.ko-fi.com/cdn/nav-logo-stroke.png" alt="" />
        Buy me a coffe
      </button>
    </a>
  </div>
);

export default Gifts;
