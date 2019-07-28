import Version from "./Version";

class RefactoringStorage {

    getCurrentVersion() {
        if (!this.currentVersion) {
            if (localStorage.getItem("currentVersion")) {
                let serializedVersion = JSON.parse(localStorage.getItem("currentVersion"));
                this.currentVersion = Version.fromJSON(serializedVersion);
            }
            else {
                this.currentVersion = new Version();
            }
        }
        return this.currentVersion;
    }

    getVersions() {
        if (!this.versions) {
            this.versions = [];
            if (localStorage.getItem("versions")) {
                let allSerializedVersions = JSON.parse(localStorage.getItem("versions"));
                for (let i = 0; i < allSerializedVersions.length; i++) {
                    this.versions.push(Version.fromJSON(allSerializedVersions[i]));
                }
            }
        }
        return this.versions;
    }

    addVersion(aVersion) {
        let found = false;
        for (let i = 0; i < this.getVersions().length && !found; i++) {
            if (aVersion.getName() == this.getVersions().getName()) {
                this.getVersions()[i] = aVersion;
                found = true;
            }
        }
        if (!found) {
            this.getVersions().push(aVersion);
        }
    }

    getVersion(aName) {
        for (let i = 0; i < this.getVersions().length; i++) {
            if (aName == this.getVersions().getName()) {
                return this.getVersions()[i];
            }
        }
        return null;
    }

    save() {
        const serializedVersions = this.getVersions().map(function (version) {
           return version.serialize();
        });
        localStorage.setItem("versions", JSON.stringify(serializedVersions));
        localStorage.setItem("currentVersion", JSON.stringify(this.getCurrentVersion().serialize()));
    }
}

export default RefactoringStorage;