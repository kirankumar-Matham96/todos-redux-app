import { MutatingDots } from "react-loader-spinner";

export const Loader = () => {
  return (
    <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#059dc0"
      secondaryColor="#059dc0"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
