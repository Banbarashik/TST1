import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground flex h-42 items-center">
      <div className="flex w-full justify-center gap-16">
        <ul className="text-lg font-bold">
          <li className="text-accent mb-2">+7 (3846) 68-23-24</li>
          <li>
            8-961-737-83-14{" "}
            <span className="font-medium"> - технические вопросы</span>
          </li>
          <li>
            8-904-968-14-88 <span className="font-medium">- отдел продаж</span>
          </li>
        </ul>
        <ul className="font-medium">
          <li>
            Юр. адрес: г. Новосибирск, ул. Широкая, здание 1 А, офис 207/1
          </li>
          <li>Почтовый адрес: 652710, г. Киселевск, ул. Юргинская, 1</li>
        </ul>
        <div className="flex flex-col items-end gap-3">
          <p className="text-accent text-xl font-medium">zao_tst@mail.ru</p>
          <Logo place="footer" />
        </div>
      </div>
    </footer>
  );
}
