import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const phone = "51921638910";
const message = "Hola JoyasPeru, quiero consultar por una joya.";

export function WhatsAppButton() {
  return (
    <a
      aria-label="Consultar por WhatsApp"
      className="whatsapp-float fixed bottom-5 right-5 z-50 inline-flex items-center gap-3"
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      rel="noreferrer"
      target="_blank"
    >
      <span className="whatsapp-prompt hidden rounded-full border border-white/70 bg-white/92 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink)] shadow-[0_16px_45px_rgba(26,26,26,0.14)] backdrop-blur-xl sm:inline-flex">
        Para mas informacion y consultas, contactanos de inmediato
      </span>
      <span className="whatsapp-orbit grid size-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(37,211,102,0.45)]">
        <WhatsAppIcon size={31} />
      </span>
    </a>
  );
}
