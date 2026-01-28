import { DeleteAccountBtn } from "@/components/settings/DeleteAccountBtn";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <h1 className="mb-8 text-center text-2xl font-bold">Settings</h1>
      <div className="mb-4 flex flex-col gap-4">
        {/* <div>
          <Label htmlFor="name" className="mb-2">
            Name
          </Label>
          <Input id="name" placeholder="Enter a new username" />
        </div> */}
        <div className="border"></div>
        <div className="xs:flex-row xs:items-center flex flex-col items-start justify-between gap-4">
          <div>
            <b>Delete account</b>
            <p className="text-sm">
              Once you delete your account, there is no going back.
            </p>
          </div>
          <DeleteAccountBtn />
        </div>
      </div>
    </div>
  );
}
