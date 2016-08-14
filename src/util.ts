export namespace util {
	export function getCurrentBranch(): string {
		require('shelljs/global');
		return exec("git rev-parse --abbrev-ref HEAD", {silent: true}).replace(/\r?\n/g, "");
	}

	export function equalBranches(...branchNames): boolean {
		require('shelljs/global');
		const currentBranch = exec("git rev-parse --abbrev-ref HEAD", {silent: true}).replace(/\r?\n/g, "");
		return branchNames.some((currentValue) => currentBranch === currentValue);
	}

	export function fileHasChanged(filePath: string, branchA: string, branchB: string): boolean {
		return true;
	}

	export function getRemoteBranch(remote: string = "origin") {
		return `${remote}/${getCurrentBranch()}`;
	}

	export function directoryHasChanged(directoryPath: string, branchA: string, branchB: string): boolean {
		require('shelljs/global');
		// hasn't diff
		return "" !== exec(`git diff ${branchA} ${branchB} --name-only  --relative="${directoryPath}"`, {silent: true}).replace(/\r?\n/g, "");
	}
}