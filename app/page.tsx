import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";

export default function Home() {
  return (
    <ClientOnly>
      <Container>
        <div>
          hi
        </div>
      </Container>
    </ClientOnly>
  )
}
