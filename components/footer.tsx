import Link from "next/link";

import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";

import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-secondary text-secondary-foreground flex h-42 items-center justify-end gap-26 px-20"
    >
      <div className="flex items-center gap-2">
        Создание сайта:
        <ul className="text-accent space-y-1">
          <li>
            <Link
              href="https://github.com/Banbarashik"
              target="_blank"
              className="flex items-center gap-2"
            >
              <GithubIcon />
              Banbarashik
            </Link>
          </li>
          <li>
            <a href="" className="flex items-center gap-2">
              <Mail size={20} />
              odinokiyskitalec@gmail.com
            </a>
          </li>
        </ul>
      </div>
      <ul className="font-medium">
        <li>Юр. адрес: г. Новосибирск, ул. Широкая, здание 1 А, офис 207/1</li>
        <li>Почтовый адрес: 652710, г. Киселевск, ул. Юргинская, 1</li>
      </ul>
      <ul>
        <li>
          <span className="font-semibold">8-961-737-83-14</span> - технические
          вопросы
        </li>
        <li>
          <span className="font-semibold">8-904-968-14-88</span> - отдел продаж
        </li>
      </ul>
      <div className="flex gap-6 text-xl">
        <Logo place="footer" />
        <div>
          <p className="text-accent">+7 (3846) 68-23-24</p>
          <p className="text-accent">zao_tst@mail.ru</p>
        </div>
      </div>
    </footer>
  );
}
