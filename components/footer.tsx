import Link from "next/link";

import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";

import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-secondary text-secondary-foreground relative py-4 pr-4 sm:pb-10 sm:pl-26 lg:flex lg:h-62 lg:items-center lg:gap-16"
    >
      <div className="lg:ml-auto lg:flex lg:items-center lg:gap-16">
        <div className="mb-6 flex items-center justify-center gap-4 sm:justify-start lg:order-last lg:m-0">
          <Logo place="footer" />
          <div className="text-lg">
            <p className="text-accent">+7 (3846) 68-23-24</p>
            <a href="mailto:zao_tst@mail.ru" className="text-accent">
              zao_tst@mail.ru
            </a>
          </div>
        </div>
        <div className="space-y-3 text-end sm:text-start">
          <ul>
            <li className="flex flex-col sm:flex-row sm:gap-2">
              <div>
                Технические вопросы<span className="hidden sm:inline">:</span>
              </div>
              <div className="font-semibold">8-961-737-83-14</div>
            </li>
            <li className="flex flex-col sm:flex-row sm:gap-2">
              <div>
                Отдел продаж<span className="hidden sm:inline">:</span>
              </div>
              <div className="font-semibold">8-904-968-14-88</div>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-2">
              <div>
                Юридический адрес<span className="hidden sm:inline">:</span>
              </div>
              {/* 0-639 */}
              <div className="sm:hidden">г. Новосибирск, ул. Широкая,</div>
              <div className="sm:hidden">здание 1 А, офис 207/1</div>
              {/* 640-767 */}
              <div className="hidden sm:block">
                г. Новосибирск, ул. Широкая, здание 1 А,
              </div>
              <div className="hidden sm:block">офис 207/1</div>
            </li>
            <li className="flex flex-col sm:flex-row sm:gap-2">
              <div>
                Почтовый адрес<span className="hidden sm:inline">:</span>
              </div>
              <div>
                г. Киселевск, ул. Юргинская
                <span className="sm:hidden">, 1</span>
                <span className="hidden sm:inline">, дом 1</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="absolute bottom-25 -left-15 -rotate-90 space-y-1 text-[15px] lg:bottom-22">
        <p>Разработка сайта:</p>
        <Link
          href="https://github.com/Banbarashik"
          target="_blank"
          className="text-accent flex items-center gap-2"
        >
          <GithubIcon />
          Banbarashik
        </Link>
        <a href="" className="text-accent flex items-center gap-2">
          <Mail size={20} />
          odinokiyskitalec@gmail.com
        </a>
      </div>
    </footer>
  );
}
