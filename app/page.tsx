import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getPosts, { 
  IPostsParams
} from "@/app/actions/getPosts";
import PostCard from "./components/posts/PostCard";


interface HomeProps {
  searchParams: IPostsParams
};


const Home = async ({ searchParams }: HomeProps) => {
  const posts = await getPosts(searchParams);
  const currentUser = await getCurrentUser();

  if (posts.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="flex flex-row gap-x-3">
          <div className="w-3/4 p-4">
            <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              gap-8
            ">
              {posts.map((listing: any) => (
                <PostCard
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
              ))}
            </div>
          </div>
          <div className="w-1/4 border rounded-lg p-4 mt-4">
            right
          </div>
        </div>
      </Container>
    </ClientOnly>
  )
}


export default Home;