$.ajax({
    url: "/api/list",
    dataType: "json",
    success: function(data) {
        if (data.code == 0) {
            var html = "";
            data.data.map(function(v, i) {
                html += `<li>
                <span>${v.age}</span>
                <span>${v.name}</span>
                </li>`;
            })

        }

    }
})