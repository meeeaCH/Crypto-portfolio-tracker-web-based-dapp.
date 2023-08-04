# Crypto portfolio tracker web based dApp.

## About
This is a simple dApp for tracking your crypto portfolio, it was made as part of a BSc thesis in 2022. It can show your yet to be listed cryptos' value. (Not listed on CoinMarketCap or CoinGecko) Made using Moralis API. When I made it, it was completely functional, but while I was developing it, Moralis was improving too. So I had to modify it a few times. I don't know if it's still works or not.

## Dependencies, if you want to try it out. (All of it was free when I made it.)
- Moralis API
- Heroku registration, it's for hosting your backend. (Optional)
- Parse server provided by Moralis, it is run on Heroku. (You can run it localy too.)
- MondoDB for optional database functionality. It's not implemented, the backend requires it.
- Redis for access managment.

## Instructions
- Clone it.
- Register on the required sites. (Moralis, Heroku, MondoDB, Redis)
- Set up the backend on Heroku (you can run it localy too), use the documentation provided by Moralis.
- You need to change the backend server IP, the appID in the JS code. (log_in_out.js, maketable.js)
- Run the website localy or on a server.

## License:
Copyright (C) 2023 Krisztián Pfeifer (meeeaCH).

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
