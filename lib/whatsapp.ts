/** Build a WhatsApp click-to-chat link from an E.164-style phone string. */
export function whatsappChatUrl(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "");
  const url = new URL(`https://wa.me/${digits}`);
  if (message?.trim()) {
    url.searchParams.set("text", message.trim());
  }
  return url.toString();
}
