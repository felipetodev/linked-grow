
export default function WritePage() {
  return (
    <>
      <div className="hidden xl:grid md:grid-cols-2 bg-background px-4 py-2 rounded mb-2">
        <div className="flex items-center border-r font-semibold">
          Editar / Crear Post
        </div>
        <div className="ml-4 flex items-center font-semibold">
          Post Preview
        </div>
      </div>
      {/* <WritePost /> */}
      <div>
        {" <NewPost /> "}
      </div>
    </>
  )
}