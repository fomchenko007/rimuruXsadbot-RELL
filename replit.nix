{ pkgs }: {
  deps = [
    pkgs.arcan.ffmpeg
    pkgs.yarn
    pkgs.pm2
    pkgs.unzip
    pkgs.bashInteractive
    pkgs.nodePackages.bash-language-server
    pkgs.man
    pkgs.zip
    pkgs.imagemagick 
    pkgs.wget 
    pkgs.libwebp
    pkgs.libuuid
    ];
    env = {
        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.libuuid
        ];
    };
}

