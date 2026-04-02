import PostedJob from "../Components/PostedJob/PostedJob";
import PostedJobDescription from "../Components/PostedJob/PostedJobDescription";


const PostedJobPage = () => {
  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] p-4">
      <div className="flex gap-5">
        <PostedJob />
        <PostedJobDescription />
      </div>
    </div>
  );
};

export default PostedJobPage;
