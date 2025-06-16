import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="flex items-center h-42 bg-secondary text-secondary-foreground">
      <div className="gap-16 flex justify-center w-full">
        <ul className="text-lg font-bold">
          <li className="mb-2 text-accent">+7 (3846) 68-23-24</li>
          <li>
            8-961-737-83-14{" "}
            <span className="font-medium"> - технические вопросы</span>
          </li>
          <li>
            8-904-968-14-88 <span className="font-medium">- отдел продаж</span>
          </li>
        </ul>
        <ul className="font-medium">
          <li>Юр. адрес: г. Новосибирск, ул. Широкая, дом 1 А, офис 207/1</li>
          <li>Почтовый адрес: 652710, г. Киселевск, ул. Юргинская, 1</li>
        </ul>
        <p className="text-xl font-medium text-accent">zao_tst@mail.ru</p>
        <Logo />
      </div>
    </footer>
  );
}
