"use client";
import createNewAlias from "@/lib/createNewAlias";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";

export default function UrlForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    return (
        <form
            className="w-96 rounded-xl p-4 bg-sky-400"
            onSubmit={async (event) => {
                event.preventDefault();
                setError("");
                setShortUrl("");
                createNewAlias(url, alias)
                    .then((res) => {
                        if (typeof res === "string") {
                            setError(res);
                        } else {
                            setShortUrl(`${window.location.origin}/r/${res.alias}`);
                        }
                    })
                    .catch((err) => console.error(err));
            }}
        >
            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%" }}
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%", marginTop: "0.5rem" }}
                label="Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
            />
            <FormHelperText error={error !== ""}>
                {error !== "" ? error : "Enter a URL and a custom alias"}
            </FormHelperText>
            <div className="w-full flex justify-center">
                <Button
                    sx={{ width: "80px" }}
                    variant="contained"
                    type="submit"
                    disabled={url === "" || alias === ""}
                >
                    Shorten
                </Button>
            </div>
            {shortUrl !== "" && (
                <div className="flex flex-col items-center mt-4">
                    <p className="break-all">{shortUrl}</p>
                    <Button
                        variant="outlined"
                        sx={{ backgroundColor: "white", marginTop: "0.5rem" }}
                        onClick={() => navigator.clipboard.writeText(shortUrl)}
                    >
                        Copy
                    </Button>
                </div>
            )}
        </form>
    );
}