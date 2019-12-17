<<<<<<< HEAD
import React, { useEffect } from 'react';
import './Reviews.scss';

const Header = () => {
  useEffect(() => {
    VK.Widgets.Comments('vk_comments', { limit: 10, attach: '*' });
  }, []);

  return <div id="vk_comments" />;
};

export default Header;
=======
import React, { useEffect } from 'react';
import './Reviews.scss';

const Header = () => {
  useEffect(() => {
    VK.Widgets.Comments('vk_comments', { limit: 10, attach: '*' });
  }, []);

  return <div id="vk_comments" />;
};

export default Header;
>>>>>>> fd06c73ece4f09d1b65208b7b08016a04d896128
