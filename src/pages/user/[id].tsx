import { useRouter } from "next/router";

  const editUser=()=>{
    const router = useRouter();
    return (
      <>
        <h2>Registe
          {router.query.id}
          r</h2>
      </>
    );
  }
  export default  editUser;

  