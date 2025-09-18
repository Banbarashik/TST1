import Link from "next/link";

import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";

import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-secondary text-secondary-foreground relative py-4 pr-4"
    >
      <div className="mb-6 flex items-center justify-center gap-4">
        <Logo place="footer" />
        <div className="text-lg">
          <p className="text-accent">+7 (3846) 68-23-24</p>
          <a href="mailto:zao_tst@mail.ru" className="text-accent">
            zao_tst@mail.ru
          </a>
        </div>
      </div>
      <div className="space-y-3 text-end">
        <ul>
          <li>
            <div>Технические вопросы</div>
            <div className="font-semibold">8-961-737-83-14</div>
          </li>
          <li>
            <div>Отдел продаж</div>
            <div className="font-semibold">8-904-968-14-88</div>
          </li>
        </ul>
        <ul className="space-y-2 font-medium">
          <li>
            <div>Юридический адрес</div>
            <div>г. Новосибирск, ул. Широкая,</div>
            <div>здание 1 А, офис 207/1</div>
          </li>
          <li>
            <div>Почтовый адрес</div> <div>г. Киселевск, ул. Юргинская, 1</div>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-25 -left-15 -rotate-90 space-y-1 text-[15px]">
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
