
import React from 'react';

const Footer: React.FC = () => {
  return (
      <footer className="bg-brand-dark text-brand-glaze pt-16 pb-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-serif text-2xl font-bold mb-4 text-brand-clay">Mỹ Thiện</h4>
            <p className="text-sm opacity-70 leading-relaxed">
              Làng nghề gốm cổ truyền tại thị trấn Châu Ổ, huyện Bình Sơn, tỉnh Quảng Ngãi. 
              Gốm Mỹ Thiện là niềm tự hào của người dân miền Ấn Trà.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Liên kết</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#gioi-thieu" className="hover:text-brand-clay transition-colors">Lịch sử làng nghề</a></li>
              <li><a href="#quy-trinh" className="hover:text-brand-clay transition-colors">Kỹ thuật chế tác</a></li>
              <li><a href="#sang-tao" className="hover:text-brand-clay transition-colors">Trải nghiệm AI</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Địa chỉ</h4>
            <p className="text-sm opacity-70">
              Thị trấn Châu Ổ, Huyện Bình Sơn,<br />
              Tỉnh Quảng Ngãi, Việt Nam.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-6 border-t border-white/10 pt-8 text-center">
          <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} Làng Gốm Mỹ Thiện. Một sản phẩm tôn vinh di sản bằng công nghệ AI.</p>
        </div>
      </footer>
  );
};

export default Footer;
