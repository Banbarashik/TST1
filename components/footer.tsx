import Link from "next/link";

import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";

import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-secondary text-secondary-foreground flex h-42 items-center overflow-x-clip" //* temporary 'overflow-x-clip'
    >
      <div className="max-w-screen-3xl mx-auto flex w-full items-center justify-between gap-8 px-8">
        <div className="space-y-1 text-[15px]">
          <p className="mb-2">Разработка сайта:</p>
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
        <ul className="font-medium xl:text-sm 2xl:text-base">
          <li>
            Юр. адрес: г. Новосибирск, ул. Широкая, здание 1 А, офис 207/1
          </li>
          <li>Почтовый адрес: 652710, г. Киселевск, ул. Юргинская, 1</li>
        </ul>
        <ul className="xl:text-sm 2xl:text-base">
          <li>
            <span className="font-semibold">8-961-737-83-14</span> - технические
            вопросы
          </li>
          <li>
            <span className="font-semibold">8-904-968-14-88</span> - отдел
            продаж
          </li>
        </ul>
        <div className="flex items-center sm:gap-3 2xl:gap-6">
          <Logo place="footer" />
          <div className="sm:text-sm 2xl:text-lg">
            <p className="text-accent">+7 (3846) 68-23-24</p>
            <p className="text-accent">zao_tst@mail.ru</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
